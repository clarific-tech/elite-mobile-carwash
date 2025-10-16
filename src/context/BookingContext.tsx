import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Booking, ServicePackage } from '@/types'

interface BookingState {
  bookings: Booking[]
  servicePackages: ServicePackage[]
}

type BookingAction =
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING'; payload: { id: string; updates: Partial<Booking> } }
  | { type: 'DELETE_BOOKING'; payload: string }
  | { type: 'SET_BOOKINGS'; payload: Booking[] }

const initialState: BookingState = {
  bookings: [],
  servicePackages: [
    {
      id: 'basic',
      name: 'Basic Wash',
      description: 'Exterior wash and dry',
      price: 25,
      duration: 30,
      features: ['Exterior wash', 'Tire cleaning', 'Window cleaning', 'Quick dry']
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      description: 'Complete interior and exterior cleaning',
      price: 45,
      duration: 60,
      features: ['Everything in Basic', 'Interior vacuum', 'Dashboard cleaning', 'Door panels', 'Seat cleaning'],
      popular: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe Wash',
      description: 'Full service with wax and detailing',
      price: 75,
      duration: 90,
      features: ['Everything in Premium', 'Wax application', 'Tire shine', 'Interior conditioning', 'Air freshener']
    }
  ]
}

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      }
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, ...action.payload.updates }
            : booking
        )
      }
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload)
      }
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload
      }
    default:
      return state
  }
}

interface BookingContextType {
  state: BookingState
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void
  updateBooking: (id: string, updates: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  getBookingsByDate: (date: Date) => Booking[]
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    dispatch({ type: 'ADD_BOOKING', payload: newBooking })
  }

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: { id, updates } })
  }

  const deleteBooking = (id: string) => {
    dispatch({ type: 'DELETE_BOOKING', payload: id })
  }

  const getBookingsByDate = (date: Date) => {
    return state.bookings.filter(booking => {
      const bookingDate = new Date(booking.date)
      return bookingDate.toDateString() === date.toDateString()
    })
  }

  return (
    <BookingContext.Provider
      value={{
        state,
        addBooking,
        updateBooking,
        deleteBooking,
        getBookingsByDate
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}



