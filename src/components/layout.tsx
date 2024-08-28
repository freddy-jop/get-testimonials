import { twx } from "@/lib/twx";

export const Layout = twx.div((props) => [
  `max-w-7xl w-full py-4 flex flex-col gap-4 mx-auto px-4`,
]);

export const LayoutTitle = twx.h1((props) => [`text-4xl font-bold`]);
