export interface Project {
  id: string;
  title: string;
  meta: string;
  summary: string;
  links: Array<{ url: string; label: string }>;
  hasCaseStudy: boolean;
  content?: string;
}

export const projects: Project[] = [
  {
    id: "reste",
    title: "Resté",
    meta: "Co-founder & Developer | UChicago Vibe Coding Hackathon Runner-Up",
    summary: "Social discovery for hotel stays — making hotel booking social through trusted community recommendations. Think Beli, but for hotels.",
    links: [
      { url: "https://reste.app", label: "reste.app" },
      { url: "https://linktr.ee/restehack", label: "Linktree" },
    ],
    hasCaseStudy: true,
    content: `**Challenge**
Hotel booking is fundamentally broken. Travelers rely on generic star ratings from strangers, bloated review sections filled with noise ("the ice machine was loud..."), and algorithmic recommendations that don't reflect personal taste. Meanwhile, apps like Beli transformed restaurant discovery by making it social—trusted recommendations from friends who actually know you. Hotels, as deeply emotional and expensive purchases, deserved the same treatment but lacked a platform that combined community trust with intelligent curation.

**Goals**
Build a social platform where hotel stays become trackable, shareable experiences within a trusted community. The product needed to solve three core problems: help users build a personal taste profile through logging stays, enable discovery through friends' recommendations rather than anonymous reviews, and leverage AI to make the experience more intuitive and valuable than manual review-reading.

**Research & Approach**
We studied why Beli succeeded in restaurants—it wasn't just tracking, it was the "people like me" signal that made recommendations trustworthy. We identified that hotels lacked this entirely: you either got corporate booking platforms optimized for price, or review sites drowning in unverified opinions. The opportunity was creating a closed social graph where every recommendation came from someone you actually knew and trusted.

Our technical stack reflected the need for speed and sophistication: React Native frontend for cross-platform mobile, a robust backend for user authentication and social feeds, and a custom voice-to-text microservice that would differentiate the logging experience. We built fully functional authentication, a community feed for sharing stays, and comparative features for tracking experiences over time—all within hackathon constraints.

**Creative Decisions**
The core innovation was making logging effortless through voice. Instead of typing out reviews, users could simply talk to their phone—our AI would format thoughts into structured reviews instantly. This removed friction from the tracking experience, making it feel native to how people actually reflect on travel.

We introduced "Vibe Check"—AI-distilled community feedback that surfaces the most valuable information without forcing users to read walls of text. Rather than star ratings, we emphasized vibe tags and personal rankings that captured the emotional quality of stays. The feed showed "Sarah loved this for a quiet recharge weekend" instead of generic five-star reviews.

The branding centered on "Resté"—elegant, European-inflected, suggesting both rest and refined taste. The pitch deck positioned it clearly: "Beli, but for hotels," immediately communicating the concept while establishing our own identity.

**Technical Implementation**
Frontend: React Native for iOS/Android
Backend: Custom API handling authentication, social feeds, and user profiles
Voice Service: Dedicated microservice for voice-to-text formatting
AI Integration: Voice logging and community feedback distillation

**Outcome**
Resté earned runner-up at the UChicago Vibe Coding Hackathon with a functional MVP demonstrating that hotel discovery could be reimagined as a trusted, social experience. The platform proved that combining human curation with AI assistance creates a fundamentally better way to make emotional purchase decisions—users don't want 4.6 stars, they want validation from a community they trust.`,
  },
  {
    id: "snowmap",
    title: "Snowmap",
    meta: "Co-founder | 4,000 MAUs",
    summary: "Ski resort info platform helping skiers find the best snow & plan their ski trips.",
    links: [{ url: "https://snowmap.info", label: "snowmap.info" }],
    hasCaseStudy: false,
  },
  {
    id: "drinkuplakemichigan",
    title: "DrinkUpLakeMichigan",
    meta: "Interaction Designer & Developer | Class Project",
    summary: "Playful hydration tracking & habit formation through physical-digital integration. Automatically detects drinking behavior and enables social accountability.",
    links: [
      {
        url: "https://www.youtube.com/watch?v=1hHt7-Jl9Qs",
        label: "Demo Video",
      },
    ],
    hasCaseStudy: true,
    content: `**Challenge**
Staying hydrated is critical for health, but tracking water intake is difficult—people get busy and forget to drink enough throughout the day. Traditional hydration apps rely on manual logging, which adds friction and fails when users are distracted or occupied.

**Approach**
Built a physical-digital hydration system that removes the burden of manual tracking by detecting drinking behavior automatically. Using a Makey Makey kit integrated with a water cup, the system recognizes when users hold the cup and when their lips touch the rim—automatically logging water intake without any conscious input. To encourage social accountability, users can double-tap the bottom of the cup to send hydration reminder emails to friends, turning personal habit formation into a shared, playful experience.

The interaction design focused on making hydration tracking feel effortless and social rather than tedious. By embedding sensors directly into the drinking vessel and creating gesture-based interactions (double-tap to remind friends), the system meets users where they already are—at their desk, in their routine—without requiring app opens or manual logs.

**Technical Stack**
Next.js, Makey Makey, email integration

**Outcome**
A gamified hydration tracking system that automates water intake logging through physical interaction and builds habit formation through social reinforcement. The project demonstrates how playful, tangible interactions can solve real behavioral challenges better than screen-based apps alone.`,
  },
  {
    id: "voice-ping-pong",
    title: "Voice Ping Pong",
    meta: "Developer | Intro to HCI",
    summary: "Voice-controlled gaming with spatial audio — using voice commands to control gameplay and spatial sound to communicate ball position.",
    links: [
      {
        url: "https://www.youtube.com/watch?v=wlkEUxtRtdg",
        label: "Demo Video",
      },
    ],
    hasCaseStudy: true,
    content: `**Challenge**
Traditional game interfaces rely on manual controllers, creating accessibility barriers and limiting alternative interaction models. The opportunity was to explore voice as a primary control mechanism while using spatial audio to communicate game state.

**Approach**
Built a voice-controlled ping pong game in Python where spoken commands control paddle position, power-ups, and menus. The key innovation: spatial audio that pans ball sounds left-right based on screen position, allowing players to track the ball through hearing rather than sight alone. The interaction design balanced natural speech patterns with responsive controls, while the audio system calculated real-time sound positioning to create an intuitive auditory representation of game space.

**Technical Stack**
Python, voice recognition, spatial audio processing

**Outcome**
A multimodal gaming experience proving that voice input and spatial audio can effectively replace traditional visual-manual controls, demonstrating accessible design principles while creating engaging alternative gameplay.`,
  },
  {
    id: "legoat-detector",
    title: "LeGoat Detector",
    meta: "Developer | MediaPipe Experiment",
    summary: "Real-time facial expression recognition system that detects different expressions and displays corresponding LeBron James photos.",
    links: [
      {
        url: "https://github.com/markxiong0122/funny-stuff",
        label: "GitHub",
      },
      {
        url: "https://www.instagram.com/reel/DQSTZCLiXHA/?igsh=d2tvYW0yNWk3dGo2",
        label: "Demo Video",
      },
    ],
    hasCaseStudy: true,
    content: `**Challenge**
Most MediaPipe tutorials focus on basic implementation without exploring creative applications. The opportunity was to build an interactive real-time system that detects facial expressions and triggers immediate visual responses.

**Approach**
Built a facial expression detection system using MediaPipe Face Mesh (468 facial landmarks) and OpenCV for video processing. The algorithm analyzes facial landmark positions and distances to classify different expressions, then displays corresponding images in real-time. To make the output inherently shareable and meme-able, I used LeBron James portraits that change based on detected expressions—leaning into internet culture and creating something people would actually want to show others.

The core technical challenge was calibrating detection thresholds to work reliably across different users, lighting, and camera angles, requiring iterative testing to find the right sensitivity balance. The dual-window system shows both the camera feed with detection overlays and synchronized LeBron image outputs, creating transparent feedback that makes the algorithm's behavior immediately visible.

**Technical Stack**
MediaPipe 0.10.7, OpenCV 4.8.1, NumPy, Python 3.11

**Outcome**
A playful computer vision experiment demonstrating sub-100ms real-time facial expression recognition on consumer hardware. The meme-focused approach transformed a technical demo into shareable entertainment, while the heavily-documented code serves as a learning resource for gesture-based interaction projects.`,
  },
];
