'use strict';
/* global $ */

console.log("hello from client.js")

let countries = []

function populate() {
    
}

$(() => {
    $.ajax({
        method: 'get',
        url: 'get/country',
        success: function(data) {
          countries = data
          $('.countries').each(function() {
              for (let obj of countries) {
                  let option = document.createElement("option")
                  option.value = obj.name
                  option.text = obj.name
                  this.add(option)
              }
          })
        }
    })
    
    $('#result').click(function() {
        let source = $('#source option:selected').text()
        let to     = $('#to option:selected').text()
        let amount = $('#amount').val()
        $.ajax({
          method: 'get',
          url: 'exchange/' + source,
          success: function (data) {
            console.log('got ' + data.name)
            let name1 = data.name
            let rate1 = data.rate
            let symbol1 = data.notation
            $.ajax({
              method: 'get',
              url: 'exchange/' + to,
              success:function (data) {
                console.log('got ' + data.name)
                let name2 = data.name
                let rate2 = data.rate
                let symbol2 = data.notation
                console.log('rate1: ' + rate1 + '\nrate2: ' + rate2)
                $('#country1').text(name1)
                $('#country2').text(name2)
                $('#rate1').text(rate1)
                $('#rate2').text(rate2)
                $('#symbol1').text(symbol1)
                $('#amt1').text(amount)
                $('#symbol2').text(symbol2)
                $('#amt2').text(Number(amount * rate1 / rate2).toFixed(2))
              }
            })
          }
        })
    })
    
    $('#submitcountry').click(function() {
        $.ajax({
          method: 'put',
          data: JSON.stringify({
              name:       $('#name').val(),
              currency:   $('#currency').val(),
              rate:       Number($('#rate').val()),
              commission: Number($('#commission').val()),
              notation:   $('#notation').val()
          }),
          contentType: 'application/json',
          url: 'put/country',
          success: function(data) {
            console.log('success')
          }
        })
    })
    
    $('#clearsubmissionform').click(function() {
        $('#add input').val('')
    })
        
    $('#exchange-tab').click(function() {
        $('#add-tab').removeClass('selected')
        $('#update-tab').removeClass('selected')
        $(this).addClass('selected')
        $('#exchange').removeClass('hidden')
        $('#add').addClass('hidden')
        $('#update').addClass('hidden')
    })
    $('#add-tab').click(function() {
        $('#exchange-tab').removeClass('selected')
        $('#update-tab').removeClass('selected')
        $(this).addClass('selected')
        $('#exchange').addClass('hidden')
        $('#add').removeClass('hidden')
        $('#update').addClass('hidden')
    })
    $('#update-tab').click(function() {
        $('#exchange-tab').removeClass('selected')
        $('#add-tab').removeClass('selected')
        $(this).addClass('selected')
        $('#exchange').addClass('hidden')
        $('#add').addClass('hidden')
        $('#update').removeClass('hidden')
    })
})