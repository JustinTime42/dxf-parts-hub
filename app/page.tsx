import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DXF Parts Hub</h1>
          <nav>
            <Link href="#features" passHref>
              <span className="mx-2 cursor-pointer">Features</span>
            </Link>
            <Link href="#how-it-works" passHref>
              <span className="mx-2 cursor-pointer">How It Works</span>
            </Link>
            <Link href="#cta" passHref>
              <span className="mx-2 cursor-pointer">Get Started</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Simplify Your CNC Cutting Process</h2>
          <p className="text-lg mb-8">
            Create DXF files for common parts quickly and easily. Save time and boost productivity.
          </p>
          <Link href="#cta" passHref>
            <span className="bg-white text-blue-700 py-2 px-6 rounded-full font-bold cursor-pointer">
              Try It for Free
            </span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Library of Templates</h4>
              <p>
                Access a wide range of templates for common parts such as flanges, brackets, squares, triangles, and more.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Customizable Dimensions</h4>
              <p>
                Input your specific dimensions to create a custom DXF file tailored to your needs. Create multiple parts at once.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Instant DXF File Generation</h4>
              <p>
                Generate DXF files instantly without the need to use AutoCAD, saving you valuable time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-900 py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">1. Select a Template</h4>
              <p>
                Choose from our extensive library of pre-designed templates for common parts.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">2. Enter Dimensions</h4>
              <p>
                Input the required dimensions to customize the template to your specific needs.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4">3. Generate DXF</h4>
              <p>
                Instantly generate the DXF file and download it for use with your CNC cutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Get Started with Our Free Beta</h3>
          <p className="text-lg mb-8">
            Sign up now and get access to all features for free during our early access beta.
          </p>
          <Link href="/signup" passHref>
            <span className="bg-white text-blue-700 py-2 px-6 rounded-full font-bold cursor-pointer">
              Create an Account
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
