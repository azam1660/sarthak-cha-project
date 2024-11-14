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
import {
  MapPin,
  Shield,
  Clock,
  Battery,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function DriverLandingPage() {
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
            DriverTrack
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
              href="#faq"
              className="hover:text-[#b38b35] transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <Button className="hidden md:inline-flex bg-[#59458d] text-white hover:bg-[#b38b35]">
            Start Broadcasting
          </Button>
          <button
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
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
              href="#faq"
              className="block py-2 hover:text-[#b38b35] transition-colors"
            >
              FAQ
            </Link>
            <Button className="w-full mt-4 bg-[#59458d] text-white hover:bg-[#b38b35]">
              Start Broadcasting
            </Button>
          </nav>
        )}
      </header>

      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simplify Your Route with DriverTrack
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Broadcast your bus location effortlessly, keeping students
              informed and your route running smoothly.
            </p>
            <Button className="bg-[#59458d] text-white hover:bg-[#b38b35] text-lg px-8 py-3 rounded-full">
              Get Started Now
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Features Designed for Drivers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <MapPin className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "One-Touch Broadcasting",
                  description: "Start sharing your location with a single tap.",
                },
                {
                  icon: <Shield className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "Privacy Protection",
                  description:
                    "Your personal information stays private and secure.",
                },
                {
                  icon: <Clock className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "Automatic Scheduling",
                  description:
                    "Set your broadcast times to match your route schedule.",
                },
                {
                  icon: <Battery className="w-12 h-12 mb-4 text-[#b38b35]" />,
                  title: "Battery Efficient",
                  description:
                    "Optimized to minimize impact on your device's battery life.",
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
                  title: "Download the App",
                  description: "Get the DriverTrack app on your smartphone.",
                },
                {
                  step: "2",
                  title: "Set Up Your Route",
                  description: "Enter your bus number and route details.",
                },
                {
                  step: "3",
                  title: "Start Broadcasting",
                  description:
                    "Tap to start sharing your location with students.",
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

        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  question: "Is my personal information safe?",
                  answer:
                    "Yes, we only broadcast your bus location. No personal data is shared with students or the public.",
                },
                {
                  question: "Will this drain my phone battery?",
                  answer:
                    "Our app is optimized for low battery usage. You can easily complete your route on a single charge.",
                },
                {
                  question: "Can I control when I'm broadcasting?",
                  answer:
                    "You can start and stop broadcasting at any time, or set up automatic schedules.",
                },
                {
                  question: "What if I forget to stop broadcasting?",
                  answer:
                    "Don't worry! The app automatically stops broadcasting when you reach your end point or after a set time.",
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ChevronRight className="w-6 h-6 mr-2 text-[#b38b35]" />
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#59458d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Simplify Your Route?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join fellow drivers who are already using DriverTrack to make
              their routes more efficient and keep students informed.
            </p>
            <Button className="bg-white text-[#59458d] hover:bg-[#b38b35] hover:text-white text-lg px-8 py-3 rounded-full">
              Download DriverTrack Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#fffaef] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                DriverTrack
              </Link>
              <p className="mt-2">
                Simplifying bus routes for drivers and students.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="#" className="hover:text-[#b38b35] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#b38b35] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[#b38b35] transition-colors">
                Contact Support
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} DriverTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
