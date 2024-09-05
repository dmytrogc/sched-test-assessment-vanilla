import formatTime from "./utils/formatTime";

class Session {
  constructor() {}

  renderSessions(sessions, dayContainer) {
    const slotContainer = document.createElement("div");
    slotContainer.className = "slot-container";

    const timeElement = document.createElement("div");
    timeElement.className = "session-time";
    timeElement.textContent = formatTime(sessions[0].session_start);
    slotContainer.appendChild(timeElement);

    const sessionContainer = document.createElement("div");
    sessionContainer.className = "session-container";
    slotContainer.appendChild(sessionContainer);

    sessions.forEach((session) => {
      const sessionCardElement = this.createSessionCard(session);
      const sessionCardWrapper = document.createElement("div");
      sessionCardWrapper.className = "session-card-wrapper";
      sessionCardWrapper.appendChild(sessionCardElement);
      sessionContainer.appendChild(sessionCardWrapper);
    });

    dayContainer.appendChild(slotContainer);
  }

  // Creates a session card element
  createSessionCard(session) {
    const { name, description, session_type: sessionType, roles } = session;

    const cardContainer = document.createElement("div");
    cardContainer.className = "session-card";

    const title = document.createElement("h3");
    title.className = "session-card-title";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "session-card-link";
    link.textContent = name;
    title.appendChild(link);
    cardContainer.appendChild(title);

    // Add sorted speakers data
    const speakersData = roles
      .filter((role) => role.usertype === "speaker")
      .sort((a, b) => a.name.localeCompare(b.name));
    if (speakersData.length > 0) {
      const speakersContainer = document.createElement("div");
      speakersContainer.className = "speakers-container";

      const speakersImages = document.createElement("div");
      speakersImages.className = "speakers-images";
      const img = document.createElement("img");
      img.className = "speaker-image";
      img.src =
        "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=t079TIvLJCn2fePWpCuKgzauHnehzuVvc4DUCecDBuw=";
      img.alt = "speaker";
      speakersImages.appendChild(img);

      const speakersNames = document.createElement("div");
      speakersNames.className = "speakers-names";
      speakersNames.textContent = speakersData.map((s) => s.name).join(", ");

      speakersContainer.appendChild(speakersImages);
      speakersContainer.appendChild(speakersNames);
      cardContainer.appendChild(speakersContainer);
    }

    const descriptionElement = document.createElement("p");
    descriptionElement.className = "session-description";
    descriptionElement.innerHTML = description;
    cardContainer.appendChild(descriptionElement);

    const sessionTypes = sessionType.length ? sessionType.split(", ") : [];
    const chipsContainer = document.createElement("div");
    chipsContainer.className = "chips-container";

    sessionTypes.forEach((type) => {
      const chipElement = this.createSessionTypeChip(type);
      chipsContainer.appendChild(chipElement);
    });

    cardContainer.appendChild(chipsContainer);

    return cardContainer;
  }

  createSessionTypeChip(type) {
    const normalizedType = type.toLowerCase();

    let chipClass = "chip-default";
    switch (true) {
      case normalizedType.includes("gold"): {
        chipClass = "chip-gold";
        break;
      }
      case normalizedType.includes("silver"): {
        chipClass = "chip-silver";
        break;
      }
      case normalizedType.includes("bronze"): {
        chipClass = "chip-bronze";
        break;
      }
    }

    const chipElement = document.createElement("p");
    chipElement.className = `session-type-chip ${chipClass}`;
    chipElement.textContent = this.getDisplayedType(type);

    return chipElement;
  }

  getDisplayedType(type) {
    const parts = type.split(/[-\s]+/);
    parts.pop();

    const formattedParts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );

    return formattedParts.join(" ");
  }
}

export default Session;
