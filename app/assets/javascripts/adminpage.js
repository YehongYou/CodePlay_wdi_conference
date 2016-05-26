$(document).ready(function() {
  var undisplayApplicationTable = function() {
     var applyingItems = $('.applying-item');
     var $applyingTable = $('.applying-list');
     // if all the item css display == none undisplay the table
     var displayTable = false;
     for(var i=0;i<applyingItems.length;i++) {
        if (applyingItems.eq(i).css('display') != 'none') {
          displayTable = true;
        }
     }
     if (displayTable === false) {
        $applyingTable.css({"display":"none"});
        $(".applying-users-handler").append($("<p class='no-pending-msg'>There's no pending application.</p>"));
     }
  }

  var undisplaySpeakersTable = function() {
    debugger
     var speakerItems = $('.speaker-item');
     var $speakerTable = $('.speakers-list-form');
     // if all the item css display == none undisplay the table
     var displayTable = false;
     for(var i=0;i<speakerItems.length;i++) {
        if (speakerItems.eq(i).css('display') != 'none') {
          displayTable = true;
        }
     }
     if (displayTable === false) {
        $speakerTable.remove();
        debugger
        if ($(".no-speakers").css("display") === "none") {
          $(".no-speakers").css("display","block");
        } else {
          $("#event-speakers").append($('<p class="no-speakers">There are currently no speakers.</p>'));
        }
     }
  }

  $('.approve-button').on('click',function(event){
    var $applyingList = $(this).closest('.applying-item');
    var event_speaker_id = $applyingList.data('event-speaker-id');
    var scheduledTime = $applyingList.find('.schedule-time').val();
    $.ajax({
      url: '/api/apply',
      data: {id: event_speaker_id, time: scheduledTime,status: 'approved'},
      method: 'put'
    }).done(function(data) {
      debugger
      $applyingList.css('display','none');
      // undisplay application table when there's no applying item
      undisplayApplicationTable();
      //if speakers-list-form does not exist create one
      if($(".no-speakers").css("display") != "none" && $(".no-speakers").length != 0) {
        $(".no-speakers").css("display","none");
        //create a new speaker table
        var speakerTemplate = $("#speaker-template").html();
        var speakerFunction = Handlebars.compile(speakerTemplate);
        var speakerList = speakerFunction({});
        $("#event-speakers").append($(speakerList));
      }
      
      //  add approved item into speakers list
      var templateString = $("#form-template").html();
      var templateFunction = Handlebars.compile(templateString);
      var html = templateFunction({
        speaker_id: data.event_speaker.id,
        speaker_name: data.speaker.name,
        speaker_topic: data.event_speaker.topic,
        talk_time_hour: data.hour,
        talk_time_min: data.min,
        event_name: data.event.name
      });
      $('.speakers-list-form').append($(html));
    });
  });

  $('.reject-button').on('click',function(event){
    var $applyingTable = $(this).closest('.applying-list');
    var $applyingList = $(this).closest('.applying-item');
    var event_speaker_id = $applyingList.data('event-speaker-id');
    $.ajax({
      url: '/api/apply',
      data: {id: event_speaker_id},
      method: 'delete'
    }).done(function(response) {
      $applyingList.css('display','none');
      undisplayApplicationTable();
    });
  });

  // add event form
  $('.add-event-btn').on('click',function(event) {
    $('.add-events-form').slideDown("fast");
    $('.events-application-container').fadeOut(100);
    $('#navmenu').hide();
  });

  $("#close-add-event").on('click',function(event) {
    $('.add-events-form').slideUp("fast");
    $('.events-application-container').fadeIn(500);
    $('#navmenu').show(100);
  });
  // edit event form
  $('.event-edit-btn').on('click',function(event) {
    var $eventList = $(this).closest(".admin-event-list");
    var eventId = $eventList.data("event-id");
    $.ajax({
      url: "/api/events/"+eventId+"/edit"
    }).done(function(response){
      console.log(response);
      $('.edit-events-form').find("form").attr("action","/events/"+response.id);
      $('.edit-events-form').find("#event-name").val(response.name);
      $('.edit-events-form').find("#event-time").val(response.time);
      $('.edit-events-form').slideDown("fast");
      $('.events-application-container').fadeOut(100);
      $('#navmenu').hide();
    });
  });

  $("#close-edit-event").on('click',function(event){
    $('.edit-events-form').slideUp("fast");
    $('.events-application-container').fadeIn(500);
    $('#navmenu').show(100);
  });

  //delete event button 
  $(".event-delete-tbn").on('click',function(event){
    var $eventList = $(this).closest(".admin-event-list");
    var eventId = $eventList.data("event-id");
    $.ajax({
      url: '/api/events/'+eventId,
      method: 'delete'
    }).done(function(response){
      $eventList.css('display','none');
    }).fail(function(error){
      console.log(error);
    });
  });

  //delete speaker from speakers list
  $('#event-speakers').on('click','.speaker-delete-tbn',function(event){
    var $speakerItem = $(this).closest(".speaker-item");
    var speakerId = $speakerItem.data('speaker-id');
    $.ajax({
      url: '/api/apply',
      data: {id: speakerId},
      method: 'delete'
    }).done(function(response) {
      $speakerItem.css('display','none');
      // check if there's no speakers left undisplay the speakers table
      undisplaySpeakersTable();
    });
  })

});
