import Image from "next/image";

interface AnimeVideo {
  player_url: string;
  // Add any other properties related to videos
}

interface AnimeScreenshot {
  original: string;
  // Add any other properties related to screenshots
}

interface AnimeDetails {
  id: string;
  name: string;
  description: string;
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
  videos: AnimeVideo[];
  screenshots: AnimeScreenshot[]; // Fix: Make it an array of AnimeScreenshot
}

interface Params {
  id: string;
}

export default async function AnimeDetailsPage({ params }: { params: Params }) {
  const animeId = params.id;
  const details = await fetch(`https://shikimori.one/api/animes/${animeId}`);
  const data: AnimeDetails = await details.json();

  return (
    <>
      <div className="bg-sky-950 p-5 flex justify-between flex-col">
        <div className="flex justify-between justify-items-center gap-4">
          {data.screenshots.map((sc, idx) => (
            <img
              key={idx}
              src={`https://shikimori.one${sc.original}`}
              alt={`Screenshot ${idx}`}
              width="400"
              height="400"
              className="object-fill"
            />
          ))}
          <div className="text-white">
            {/* <div>page params id is {params.id}</div> */}
            <h1 className="text-2xl">{data.name}</h1>
            <p className="bg-slate-900 p-3">{data.description}</p>
            <p>Kind: {data.kind}</p>
            <p>Episodes: {data.episodes || data.episodes_aired}</p>
            <p>Score: {data.score}</p>
          </div>
        </div>

        {data.videos.map((video, index) => (
          <div key={index} className="mt-4">
            {/* Embedded YouTube player for each video */}
            <iframe
              width="560"
              height="315"
              src={video.player_url}
              title={`YouTube video player ${index + 1}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
}
