import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, MapPin, Star, CheckCircle, Shield } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "We Come to You",
      description: "No need to drive anywhere. We bring our professional equipment to your location."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Scheduling",
      description: "Book at your convenience. Available 7 days a week with flexible time slots."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Insured & Bonded",
      description: "Fully licensed, insured, and bonded for your peace of mind."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee. We stand behind our work."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing service! They came to my office and had my car sparkling in 30 minutes. Will definitely book again."
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Professional, punctual, and thorough. My car looks better than when I first bought it. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "Convenient and reliable. Perfect for busy professionals. The team is friendly and does excellent work."
    }
  ]

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section 
        className="bg-black text-white relative overflow-hidden min-h-[60vh] flex items-center"
        style={{
          backgroundImage: 'url(/elite-mobile-carwash/images/carwash_background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000000' // Fallback color
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              WHERE YOUR CAR FINDS ITS <span className="text-yellow-400">GLOW</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
              Experience next-level car care with advanced detailing, eco-conscious products, and a showroom-quality finish that turns heads wherever you go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200" asChild>
                <Link to="/booking">Schedule a wash</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg text-lg" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-300">Professional service with convenience at its core</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:bg-gray-750">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-300">Choose the perfect package for your car</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:bg-gray-750">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Basic Wash</CardTitle>
                <CardDescription className="text-gray-300">Perfect for regular maintenance</CardDescription>
                <div className="text-3xl font-bold text-yellow-400">$25</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Exterior wash</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Tire cleaning</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Window cleaning</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Quick dry</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 bg-gray-800 border-yellow-400 hover:bg-gray-750">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl text-white">Premium Wash</CardTitle>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">Most Popular</span>
                </div>
                <CardDescription className="text-gray-300">Complete interior and exterior cleaning</CardDescription>
                <div className="text-3xl font-bold text-yellow-400">$45</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Everything in Basic</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Interior vacuum</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Dashboard cleaning</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Door panels</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Seat cleaning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:bg-gray-750">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Deluxe Wash</CardTitle>
                <CardDescription className="text-gray-300">Full service with wax and detailing</CardDescription>
                <div className="text-3xl font-bold text-yellow-400">$75</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Everything in Premium</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Wax application</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Tire shine</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Interior conditioning</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-4 w-4 text-yellow-400 mr-2" />Air freshener</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg transition-all duration-200" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-300">Don't just take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 hover:bg-gray-750">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Book your mobile car wash service today and experience the convenience!
          </p>
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200" asChild>
            <Link to="/booking">Schedule a wash</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

