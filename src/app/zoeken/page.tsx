import Navbar from "@/components/layout/Navbar";
import SearchForm from "@/components/zoeken/SearchForm";

export const metadata = {
  title: "Auto zoeken | AutoMatch",
  description: "Plaats jouw autozoekopdracht en ontvang aanbiedingen van aangesloten dealers.",
};

export default function ZoekenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <SearchForm />
      </div>
    </div>
  );
}
