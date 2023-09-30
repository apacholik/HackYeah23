import Image from "next/image";

export default function AnimalReportThanks() {
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <Image className="w-1/3" src="/assets/img/ok.png" alt="alright!" width="300" height="300" />
      <div className="border border-green-800 bg-green-200 text-green-900 p-6 rounded-md font-bold text-center w-1/3">
        Zgłoszenie przyjęte!
      </div>
    </div>
  );
}
