class UsersController < ApplicationController

  def index
    @user = current_user
    @events = Event.all
  end

  def new
  end

  def create
    @user = User.new
    @user.name = params[:name]
    @user.email = params[:email]
    @user.password = params[:password]
    @user.desc = params[:desc]
    @user.user_type_id = 2
    @user.img = "/assets/robot.png"
    if @user.save
      # send email
      UserMailer.signup_confirmation(@user).deliver_now
      session[:user_id] = @user.id
      redirect_to '/users'
    else
      redirect_to '/'
    end
  end

  def show
    @user = current_user
    render :index
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.name = params[:name]
    user.email = params[:email]
    user.password = params[:password]
    user.desc = params[:desc]
    user.img = params[:img]
    if user.save
      redirect_to '/users'
    else
      render :edit
    end
  end

  def destroy

  end

  def apply
    event_speaker = EventSpeaker.new
    event_speaker.user_id = session[:user_id]
    event_speaker.event_id = Event.first.id
    event_speaker.topic = params[:topic]
    event_speaker.content = params[:desc]
    event_speaker.application_status = "applying"
    event_speaker.save
    redirect_to '/users'
  end

  def destroy_event_speaker
     event_speaker = EventSpeaker.find(params[:id])
     event_speaker.destroy
     redirect_to '/events'
  end

end
