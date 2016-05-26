class HomesController < ApplicationController
  def index
    event_speakers = EventSpeaker.where(application_status: "approved")
    @speakers = []
    event_speakers.each do |event_speaker|
      @speakers << event_speaker.user
    end
    @speakers.uniq!

    # ====== show all speakers on the schedule of homepage====
    event = Event.first
    @approved_speakers = event.event_speakers.where(application_status: "approved")
    @talks = @approved_speakers.sort_by{|talk| talk[:talk_time]}

    # ====== show all sponsors image on the schedule of homepage ====
    @images = Dir.glob("app/assets/images/sponsors/*.png")
  end
end
