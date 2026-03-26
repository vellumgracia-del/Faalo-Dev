import { client } from "@/sanity/lib/client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Request Netlify to revalidate at most every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt asc)`);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
