import { headFont } from "@/app/layout";
import Icon from "@/assets/Icon.svg";
import Image from "next/image";
import svg from "../../../public/Scheme_svg.svg";
import Link from "next/link";

export default async function Schemes() {
  const scheme = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schemes`);
  const schemeData = await scheme.json();

  console.log(schemeData);

  // const schemeData = [
  //   {
  //     id: 1,
  //     title: "PM-KISAN",
  //     fullForm: "Pradhan Mantri Kisan Samman Nidhi",
  //     description:
  //       "Direct income support of ₹6,000 per year to all farmer families in three equal installments.",
  //     benifits: [
  //       "₹2,000 per installment",
  //       "Direct bank transfer",
  //       "No income limit",
  //       "All landholding farmers eligible",
  //     ],
  //     eligibility: "All landholding farmers across India",
  //     badge: "Financial Support",

  //   },
  //   {
  //     id: 2,
  //     title: "PMFBY",
  //     fullForm: "Pradhan Mantri Fasal Bima Yojana",
  //     description:
  //       "Comprehensive crop insurance scheme protecting farmers from crop loss due to natural calamities.",
  //     benifits: [
  //       "Low premium",
  //       "Natural disaster cover",
  //       "Easy claim process",
  //       "Government subsidy",
  //     ],
  //     eligibility: "All landholding farmers across India",
  //     badge: "Insurance",
  //   },
  // ];

  return (
    <section>
      {/* TOP HEADING */}
      <div className="bg-white py-12 md:py-20 text-center px-4">
        <h2 className={`${headFont.className} text-3xl md:text-5xl`}>
          <span className="text-black">Government </span>
          <span className="text-lime-500">Schemes</span>
        </h2>

        <p className="mt-5 text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
          Explore various government initiatives designed to support farmers and
          boost agricultural development across India
        </p>
      </div>

      {/* CARDS */}
      <div className="bg-[#F5F0E6] py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {schemeData.map((item) => (
            <div
              key={item.schemeId}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-2xl transition flex flex-col cursor-pointer"
            >
              {/* badge */}
              <div className="flex justify-between items-center">
                <div className="bg-lime-500 h-12 w-12 rounded-lg flex justify-center">
                  <Image src={svg} alt={item.schemeCategory}></Image>
                </div>
                <span className="text-xs bg-[#F5F0E6] px-3 py-1 rounded-lg text-gray-700">
                  {item.schemeCategory}
                </span>
              </div>

              {/* title */}
              <h3 className="text-lime-500 mt-4 text-lg font-semibold">
                {item.schemeTitle}
              </h3>
              <p className="text-gray-600 text-sm">{item.schemeFullName}</p>
              <p className="text-gray-600 text-sm mt-3">
                {item.schemeDescription}
              </p>
              {/* benefits */}
              <div className="mt-4">
                <p className="text-black font-medium">Key Benefits:</p>
                <ul className="mt-2 space-y-1">
                  {item.schemeBenefits.map((b, i) => (
                    <li key={i} className="text-gray-600 text-sm">
                      <Image
                        src={Icon}
                        alt="icon"
                        width={14}
                        height={14}
                        className="inline mr-2"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              {/* eligibility */}
              <div className="bg-[#F5F0E6] p-3 mt-4 rounded-lg">
                <p className="text-gray-600 text-sm">Eligibility:</p>
                <p className="text-gray-800 text-sm">
                  {item.schemeEligibility}
                </p>
              </div>

              {/* button */}
              <Link
                href={item.schemeOfficialLink}
                target="_blank"
                className="mt-6 bg-lime-500 text-white py-2 rounded-xl hover:bg-lime-600 transition text-center"
              >
                Learn More & Apply
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
