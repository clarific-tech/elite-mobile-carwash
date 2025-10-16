import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = (data: ContactFormData) => {
    // In a real app, this would send the data to a server
    console.log('Contact form submitted:', data)
    setIsSubmitted(true)
    reset()
  }

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["(555) 123-4567", "(555) 123-4568"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@mobilecarwash.com", "support@mobilecarwash.com"],
      description: "Send us an email anytime"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Service Area",
      details: ["Greater Metro Area", "Within 25 miles of downtown"],
      description: "We come to your location"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: ["Monday - Sunday", "8:00 AM - 6:00 PM"],
      description: "Available 7 days a week"
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-yellow-400" />
              </div>
              <CardTitle className="text-2xl text-yellow-400">Message Sent!</CardTitle>
              <CardDescription className="text-gray-300">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsSubmitted(false)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? Need a custom quote? We're here to help! 
            Get in touch with us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Send className="h-5 w-5 mr-2 text-yellow-400" />
                Send us a Message
              </CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email address"
                    className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    {...register('phone')}
                    placeholder="Enter your phone number"
                    className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    {...register('message')}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Get in Touch</CardTitle>
                <CardDescription className="text-gray-300">
                  We're here to help! Choose the best way to reach us.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center text-yellow-400">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-300">{detail}</p>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">How far in advance should I book?</h4>
                  <p className="text-gray-300 text-sm">
                    We recommend booking at least 24 hours in advance, but we can often accommodate same-day requests.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">What if it rains?</h4>
                  <p className="text-gray-300 text-sm">
                    We can still provide interior cleaning services. For exterior services, we'll reschedule at no charge.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Do you provide water and electricity?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes! We bring our own water supply and equipment. We only need access to your vehicle.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">What payment methods do you accept?</h4>
                  <p className="text-gray-300 text-sm">
                    We accept cash, credit cards, and digital payments. Payment is due upon completion of service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Our Service Area</CardTitle>
              <CardDescription className="text-gray-300">
                We proudly serve the Greater Metro Area and surrounding communities within 25 miles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                  <p className="text-lg font-semibold text-white">Interactive Map</p>
                  <p className="text-sm">Service area coverage map would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

