module Api
  class SeatsController < ApplicationController

    def index

      @seats = Seat.order(:id).where(event_id: 1)
      render json: @seats.to_json(include: [:ticket, :seat_type])
    end

    def update
      # expecting front end pass seat_id: params[:seat_id]
      seat = Seat.find(params[:id].to_i)
      # expecting front end pass seat status: params[:status]
      seat.status = params[:status]
      seat.save
      render json: seat.to_json
    end

    def reserve_seats
      seat_numbers = params[:seats_num]
      reserved_seats = []
      seat_numbers.each do |seat_num|
        seat = Seat.find_by(seat_num: seat_num)
        seat.status = 'reserved'
        seat.save
        reserved_seats << seat
      end
      render json: reserved_seats.to_json
    end

    def revert_seats
      seat_numbers = params[:seats_num]
      revert_seats = []
      seat_numbers.each do |num|
        seat = Seat.find_by(seat_num: num)
        seat.status = 'available'
        seat.save
        revert_seats << seat
      end
       render json: revert_seats.to_json
    end

  end

end
