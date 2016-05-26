class EventsController < ApplicationController

  def index
    @events = Event.all
    @event_speakers = EventSpeaker.where(application_status: 'applying')
    @speakers = EventSpeaker.where(application_status: 'approved')
    @seats = Seat.where(event_id: 1)
    @taken_seats = @seats.where(status: 'Taken')
    @available_seats = @seats.where(status: 'available')
    if session[:user_id] == nil
      redirect_to '/'
    else
      @user = User.find(session[:user_id])
      if @user.user_type.group == 'admin'
        render :index
      else
        redirect_to '/'
      end
    end
  end

  def new
  end

  def create
    event = Event.new
    event.name = params[:name]
    event.time = params[:time]
    event.total_seats = params[:total_seats].to_i
    if event.save
      # generate seats after add event
      tatal_seats = event.total_seats
      seats_per_row = 10
      seats_arr = generate_seats(tatal_seats, seats_per_row,event)
      redirect_to '/events'
    else
      render :new
    end
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    event = Event.find(params[:id])
    event.name = params[:name]
    event.time = params[:time]
    if event.save
      redirect_to '/events'
    else
      render :edit
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
    redirect_to '/events'
  end

  private
    def generate_seats(tatal_seats, seats_per_row,event)
      seats_arr = []
      row_arr = ('A'..'Z').to_a
      num_of_rows = tatal_seats / seats_per_row

      num_of_rows.times do |row|
        seats_per_row.times do |seat_num|
          seat_num = seat_num + 1
          seats_arr<<row_arr[row]+seat_num.to_s
        end
      end

      tatal_seats.times do |seat_num|
        seat = Seat.new
        seat.seat_num = seats_arr[seat_num]
        seat.status = "available"
        seat.event_id = event.id
        if seats_arr[seat_num][0] == "A"
          seat.seat_type_id =  SeatType.find_by(group: "Premium").id
        else
          seat.seat_type_id = SeatType.find_by(group: "General").id
        end
        seat.save
      end

      return seats_arr
    end


end
