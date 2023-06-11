import Preset from "./components/Preset";
import Product from "./components/Product";

export default function Home() {
  return (
    <div className="text-black p-4">
      <Product />
      <div className=" h-5" />
      <Preset />
    </div>
  );
}
