import { Header } from "@/features/layout/Header";
import { LayoutParams } from "@/types/next";
// Spécifiez ici le type générique attendu pour `params`.
type MyParams = {
  id: string; // Exemple de structure de `params`
};
export default async function RouteLayout(props: LayoutParams<MyParams>) {
  return (
    <div className="h-full">
      <Header />
      {props.children}
    </div>
  );
}
