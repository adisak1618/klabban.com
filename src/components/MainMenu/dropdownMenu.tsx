export function SubMenu() {
  return (
    <div className="z-10 hidden -mx-3 absolute group-hover:block py-2">
      <div
        id="dropdownHover"
        className="top-[60px] left-0 bg-secondary divide-y divide-border rounded-lg shadow w-44"
      >
        <ul
          className="py-2 text-sm text-text-color  dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <a
              href="#"
              className="block leading-[1em] px-4 py-2 hover:bg-secondary  "
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block leading-[1em] px-4 py-2 hover:bg-secondary  "
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block leading-[1em] px-4 py-2 hover:bg-secondary  "
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block leading-[1em] px-4 py-2 hover:bg-secondary  "
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
