import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock, MapPin, User, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useBooking } from '@/context/BookingContext'
import { formatPrice, formatDate, formatTime } from '@/lib/utils'
import { ServicePackage } from '@/types'

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Please enter a valid email'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter a complete address'),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function Booking() {
  const { state, addBooking } = useBooking()
  const { servicePackages } = state
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  })

  // Generate time slots (9 AM to 6 PM, every hour)
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i
    return {
      id: `${hour}:00`,
      time: `${hour}:00`,
      available: true
    }
  })

  // Calendar navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  // Generate calendar dates for current month
  const generateCalendarDates = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const today = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(today.getMonth() + 3)
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    // First day of the week (Sunday = 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const dates = []
    const currentDate = new Date(startDate)
    
    // Generate 6 weeks (42 days) to fill the calendar grid
    for (let i = 0; i < 42; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + i)
      
      // Only include dates from today up to 3 months in the future
      const isAvailable = date >= today && date <= threeMonthsFromNow
      const isCurrentMonth = date.getMonth() === month
      
      dates.push({
        date,
        isCurrentMonth,
        isAvailable,
        isToday: date.toDateString() === today.toDateString()
      })
    }
    
    return dates
  }

  const calendarDates = generateCalendarDates()

  const onSubmit = (data: BookingFormData) => {
    if (!selectedPackage || !selectedDate || !selectedTime) {
      alert('Please select a service package, date, and time')
      return
    }

    const bookingData = {
      ...data,
      servicePackage: selectedPackage,
      date: selectedDate,
      timeSlot: selectedTime,
      status: 'pending' as const
    }

    addBooking(bookingData)
    setIsSubmitted(true)
    reset()
    setSelectedPackage(null)
    setSelectedDate(null)
    setSelectedTime(null)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
              <CardDescription>
                Thank you for choosing our mobile car wash service. We'll contact you soon to confirm the details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsSubmitted(false)} className="w-full">
                Make Another Booking
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Book Your Service</h1>
          <p className="text-xl text-gray-300">
            Choose your service package, pick a date and time, and we'll come to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="h-5 w-5 mr-2 text-yellow-400" />
                Step 1: Choose Your Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {servicePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPackage?.id === pkg.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-white">{pkg.name}</h3>
                      <p className="text-gray-300 text-sm">{pkg.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {pkg.duration} minutes
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">{formatPrice(pkg.price)}</div>
                      {pkg.popular && (
                        <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-bold">Popular</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calendar className="h-5 w-5 mr-2 text-yellow-400" />
                Step 2: Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold text-white">
                  {currentMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  disabled={currentMonth.getMonth() >= new Date().getMonth() + 2}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendarDates.map(({ date, isCurrentMonth, isAvailable, isToday }, index) => (
                  <button
                    key={index}
                    className={`p-2 text-sm rounded border transition-colors ${
                      !isCurrentMonth
                        ? 'text-gray-600 border-gray-700 cursor-not-allowed'
                        : !isAvailable
                        ? 'text-gray-500 border-gray-600 cursor-not-allowed'
                        : selectedDate?.toDateString() === date.toDateString()
                        ? 'border-yellow-400 bg-yellow-400 text-black'
                        : isToday
                        ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                    }`}
                    onClick={() => isAvailable && isCurrentMonth && setSelectedDate(date)}
                    disabled={!isAvailable || !isCurrentMonth}
                  >
                    <div className="text-center">
                      <div className="font-medium">{date.getDate()}</div>
                      {isToday && (
                        <div className="text-xs text-blue-600 font-semibold">Today</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                Step 3: Select Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className={`p-3 text-sm rounded border transition-colors ${
                      selectedTime === slot.time
                        ? 'border-yellow-400 bg-yellow-400 text-black'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {formatTime(slot.time)}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <User className="h-5 w-5 mr-2 text-yellow-400" />
                Step 4: Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <Input
                    {...register('customerName')}
                    placeholder="Enter your full name"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.customerName && (
                    <p className="text-red-400 text-sm mt-1">{errors.customerName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    {...register('customerEmail')}
                    placeholder="Enter your email"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-400 text-sm mt-1">{errors.customerEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    {...register('customerPhone')}
                    placeholder="Enter your phone number"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-400 text-sm mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Service Address *
                  </label>
                  <Textarea
                    {...register('address')}
                    placeholder="Enter the address where we should come"
                    rows={3}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <Textarea
                    {...register('notes')}
                    placeholder="Any special requests or instructions"
                    rows={2}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200"
                  disabled={!selectedPackage || !selectedDate || !selectedTime}
                >
                  Confirm Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        {selectedPackage && selectedDate && selectedTime && (
          <Card className="mt-8 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-white">Service</h4>
                  <p className="text-gray-300">{selectedPackage.name}</p>
                  <p className="text-yellow-400 font-semibold">{formatPrice(selectedPackage.price)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Date</h4>
                  <p className="text-gray-300">{formatDate(selectedDate)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Time</h4>
                  <p className="text-gray-300">{formatTime(selectedTime)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

