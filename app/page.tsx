import TSStreamPlayer from "@/components/TSStreamPlayer";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <TSStreamPlayer url="http://103.182.170.32:8888/play/a03r" />
    </main>
  );
}
