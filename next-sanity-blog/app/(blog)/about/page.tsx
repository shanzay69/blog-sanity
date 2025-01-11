import Image from "next/image";
export default function About() {
  return (
    <div className="mb-10 flex flex-col items-center lg:mb-14 lg:flex-row lg:justify-between">
      <div className="flex flex-col lg:w-1/2 space-y-10">
        <h1 className="pt-28 text-center text-black font-bold leading-tight tracking-tighter text-5xl transition duration-300 transform hover:scale-110">
          ABOUT FOR ME AND MYSELF
        </h1>
        <p className="text-xl text-gray-800 font-medium">
    I am an IT student at the Governor Sindh Initiative, embarking on an incredible journey to become a
    skilled and innovative web developer. As part of my learning experience, I have created my first
    blog using the amazing capabilities of Sanity, which has been both exciting and enriching. Alongside my passion for web development, I am also pursuing my BA Part 1 studies, balancing academics with my dream of excelling in the tech world. This blog reflects my dedication, creativity,
    and the start of an amazing adventure in the world of web development.
</p>

        <h2 className="text-black font-bold text-5xl text-center transition duration-300 transform hover:scale-110">
    Since it&apos;s a car blog, first it&apos;s important to talk about the person who created the first car in the world. Knowing his history is essential: The birth of the world&apos;s First car!
</h2>
<p className="text-xl font-medium text-gray-800">
    In 1885, German mechanical engineer Karl Benz designed and built the world&apos;s first practical automobile to be powered by an internal-combustion engine. On January 29, 1886, Benz received the first patent (DRP No. 37435) for a gas-fueled car. It was a three-wheeler; Benz built his first four-wheeled car in 1891.
    Using an improved version and without her husbands knowledge, Benzs wife Bertha and their two sons Eugen (15) and Richard (14) embarked on the first long-distance journey in automotive history on an August day in 1888. The route included a few detours and took them from Mannheim to Pforzheim, her place of birth. With this journey of 180 kilometers including the return trip Bertha Benz demonstrated the practicality of the motor vehicle to the entire world. Without her daring – and that of her sons – and the decisive stimuli that resulted from it, the subsequent growth of Benz &amp; Cie.
    in Mannheim to become the worlds largest automobile plant of its day would have been unthinkable.
</p>
      </div>
      <div className="lg:w-1/2 ml-6">
        <Image
          src="/images/motorcar.jpeg"
          alt="motorcar" 
          width={500} 
          height={300} 
          className="w-full h-auto object-cover mt-20 rounded-lg"
        />
      </div>
    </div>
  );
}
