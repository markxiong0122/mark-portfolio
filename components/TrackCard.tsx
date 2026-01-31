import { Track } from "@/content/tracks";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="track">
      <div className="track-info">
        <h4>{track.title}</h4>
        <p>{track.description}</p>
      </div>
      <div className="track-player">
        <audio controls preload="none">
          <source src={track.audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </article>
  );
}
