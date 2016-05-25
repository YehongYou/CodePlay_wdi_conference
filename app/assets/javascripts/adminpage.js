$(document).ready(function() {
  $('.approve-button').on('click',function(event){
    var $applyingList = $(this).closest('.applying-item');
    var event_speaker_id = $applyingList.data('event-speaker-id');
    var scheduledTime = $applyingList.find('.schedule-time').val();
    debugger
    $.ajax({
      url: '/api/apply',
      data: {id: event_speaker_id, time: scheduledTime,status: 'approved'},
      method: 'put'
    }).done(function(response) {
      $applyingList.css('display','none');
    });
  });

  $('.reject-button').on('click',function(event){
    var $applyingTable = $(this).closest('.applying-list');
    var $applyingList = $(this).closest('.applying-item');
    var event_speaker_id = $applyingList.data('event-speaker-id');
    debugger
    $.ajax({
      url: '/api/apply',
      data: {id: event_speaker_id},
      method: 'delete'
    }).done(function(response) {
      $applyingList.css('display','none');
      if (response === null) {
        $applyingTable.css('display','none');
      }
    });
  });

  // add event form
  $('.add-event-btn').on('click',function(event) {
    $('.add-events-form').slideDown("fast");
    $('.events-application-container').fadeOut(100);
    $('#navmenu').hide();
    // jQuery('#add-event-date-picker').datetimepicker();

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
    });
  });

  $("#close-edit-event").on('click',function(event){
    $('.edit-events-form').slideUp("fast");
    $('.events-application-container').fadeIn(500);
  });

  // add hover text for edit/delete button
  $('.event-edit-btn').on('mouseover',function(event){
    $(this).find('.edit-hover').css({"display":"block"});
  });
  $('.event-edit-btn').on('mouseout',function(event){
    $(this).find('.edit-hover').css({"display":"none"})
  });
  $('.event-delete-tbn').on('mouseover',function(event) {
    $(this).find('.delete-hover').css({"display":"block"});
  });
  $('.event-delete-tbn').on('mouseout',function(event) {
    $(this).find('.delete-hover').css({"display":"none"});
  });

});
