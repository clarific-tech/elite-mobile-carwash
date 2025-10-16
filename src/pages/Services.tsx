import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Star } from 'lucide-react'
import { useBooking } from '@/context/BookingContext'
import { formatPrice } from '@/lib/utils'

export default function Services() {
  const { state } = useBooking()
  const { servicePackages } = state

  const addOnServices = [
    {
      name: "Engine Bay Cleaning",
      price: 15,
      description: "Thorough cleaning of engine compartment"
    },
    {
      name: "Leather Conditioning",
      price: 20,
      description: "Professional leather seat treatment"
    },
    {
      name: "Headlight Restoration",
      price: 25,
      description: "Restore cloudy or yellowed headlights"
    },
    {
      name: "Paint Protection",
      price: 30,
      description: "Apply protective coating to paint"
    }
  ]

  return (
    <div className="min-h-screen py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional mobile car wash services tailored to your needs. 
            We bring our expertise and equipment directly to your location.
          </p>
        </div>

        {/* Service Packages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Service Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`bg-gray-800 border-gray-700 hover:shadow-lg transition-all duration-300 ${
                  pkg.popular ? 'border-yellow-400 shadow-lg scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-yellow-400 text-black text-center py-2 text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                  <CardDescription className="text-base text-gray-300">{pkg.description}</CardDescription>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <div className="text-4xl font-bold text-yellow-400">{formatPrice(pkg.price)}</div>
                    <div className="text-gray-400">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {pkg.duration} min
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${
                      pkg.popular 
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-black font-bold' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    asChild
                  >
                    <Link to="/booking">Book This Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add-on Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Add-on Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOnServices.map((service, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{service.name}</CardTitle>
                  <div className="text-2xl font-bold text-yellow-400">{formatPrice(service.price)}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Book Online</h3>
              <p className="text-gray-300">Choose your service and schedule a convenient time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">We Come to You</h3>
              <p className="text-gray-300">Our team arrives at your location with all equipment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Professional Service</h3>
              <p className="text-gray-300">We provide thorough, high-quality car cleaning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-400">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Enjoy Results</h3>
              <p className="text-gray-300">Your car looks amazing and you're completely satisfied</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Why Choose Our Mobile Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Convenience</h3>
              <p className="text-gray-300">No need to drive anywhere. We come to your home, office, or any location.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Time Saving</h3>
              <p className="text-gray-300">Save time by having your car cleaned while you work or relax.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Quality Guaranteed</h3>
              <p className="text-gray-300">Professional equipment and techniques ensure excellent results every time.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose your service and schedule your mobile car wash today!
          </p>
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200" asChild>
            <Link to="/booking">Book Your Service Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

