import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Clock, Bell, Smartphone, Menu, X } from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#fffaef] text-[#59458d]">
      <header
        className={`fixed w-full z-10 transition-all duration-300 ${
          isScrolled ? "bg-[#fffaef] shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            BusTracker
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="hover:text-[#b38b35] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-[#b38b35] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#contact"
              className="hover:text-[#b38b35] transition-colors"
            >
              Contact
            </Link>
          </nav>
          <Button className="hidden md:inline-flex bg-[#59458d] text-white hover:bg-[#b38b35]">
            Get Started
          </Button>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-[#fffaef] p-4">
            <Link
              href="#features"
              className="block py-2 hover:text-[#b38b35] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block py-2 hover:text-[#b38b35] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#contact"
              className="block py-2 hover:text-[#b38b35] transition-colors"
            >
              Contact
            </Link>
            <Button className="w-full mt-4 bg-[#59458d] text-white hover:bg-[#b38b35]">
              Get Started
            </Button>
          </nav>
        )}
      </header>

      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Track Your Bus in Real-Time
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Never miss your bus again. Get live updates on bus locations,
              estimated arrival times, and more.
            </p>
            <Button className="bg-[#59458d] text-white hover:bg-[#b38b35] text-lg px-8 py-3 rounded-full">
              Start Tracking Now
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <MapPin className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "Real-Time Tracking",
                  description:
                    "See your bus's exact location on the map in real-time.",
                },
                {
                  icon: <Clock className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "Arrival Predictions",
                  description:
                    "Get accurate predictions for when your bus will arrive.",
                },
                {
                  icon: <Bell className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "Notifications",
                  description:
                    "Receive alerts when your bus is approaching your stop.",
                },
                {
                  icon: (
                    <Smartphone className="w-12 h-12 mb-4 text-[#b38b35]" />
                  ),
                  title: "Mobile Friendly",
                  description:
                    "Access bus information on any device, anywhere.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-center">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Select Your Route",
                  description:
                    "Choose your bus route from the available options.",
                },
                {
                  step: "2",
                  title: "Track in Real-Time",
                  description:
                    "See the exact location of your bus on an interactive map.",
                },
                {
                  step: "3",
                  title: "Arrive on Time",
                  description:
                    "Get to your stop just in time for the bus arrival.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#59458d] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#59458d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Never Miss Your Bus Again?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already using BusTracker to
              make their commutes easier and more predictable.
            </p>
            <Button className="bg-white text-[#59458d] hover:bg-[#b38b35] hover:text-white text-lg px-8 py-3 rounded-full">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-[#fffaef] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                BusTracker
              </Link>
              <p className="mt-2">Making student commutes easier.</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="#" className="hover:text-[#b38b35] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#b38b35] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[#b38b35] transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} BusTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
