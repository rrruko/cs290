'use strict';
/* global $ */

console.log("hello from client.js")

$(() =>
    $('button').click(function() {
        console.log('clicked')
        let name = $('#name').val();
        let rate = Number($('#rate').val());
        console.log('sending name ' + name + ' and rate ' + rate)
        $.ajax({
          method: 'put',
          data: JSON.stringify({name: name, rate: rate}),
          contentType: 'application/json',
          url: 'put/country',
          success: function(data) {
            console.log('success')
          }
        })
    })
)