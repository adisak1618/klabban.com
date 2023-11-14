import { Social } from "components/MainMenu/social";

export function Footer() {
  return (
    <div className="bg-gray-800">
      <div className="container-content py-10">
        <h4 className="text-center font-bold text-h6 text-white">
          Klabban.com
        </h4>
        <div className="flex justify-center text-white">
          <Social />
        </div>
      </div>
    </div>
  );
}
