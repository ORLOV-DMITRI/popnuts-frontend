import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/home-page/Banner/Banner";
import Example from "@/components/Example/Example";
import ProductsList from "@/components/ProductsList/ProductsList";

export default function Home() {
  return (
    <div>
      <ProductsList/>
    </div>
  );
}
