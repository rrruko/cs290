'use strict';
/* global $ */

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
            let name1 = data.name
            let cur1 = data.currency
            let rate1 = data.rate
            let symbol1 = data.notation
            $.ajax({
              method: 'get',
              url: 'exchange/' + to,
              success:function (data) {
                let name2 = data.name
                let cur2 = data.currency
                let rate2 = data.rate
                let symbol2 = data.notation
                $('#country1').text(name1)
                $('#country2').text(name2)
                $('#currency1').text(cur1)
                $('#currency2').text(cur2)
                $('#rate1').text(rate1)
                $('#rate2').text(rate2)
                $('#symbol1').text(symbol1)
                $('#amt1').text(amount)
                $('#symbol2').text(symbol2)
                $('#amt2').text(Number(amount * rate1 / rate2).toFixed(2))
                $('#exchange-answer').removeClass('hidden')
              }
            })
          }
        })
    })
    
    function updateCountry(tab, name) {
      $.ajax({
          method: 'post',
          data: JSON.stringify({
              name:       name,
              currency:   $(tab + ' #currency').val(),
              rate:       Number($(tab + ' #rate').val()),
              commission: Number($(tab + ' #commission').val()),
              notation:   $(tab + ' #notation').val()
          }),
          contentType: 'application/json',
          url: 'exchange/' + name,
          success: function(data) {
            alert('Successfully submitted country.')
            $(tab + ' input').val('')
          }
      })
    }
    
    $('#submitcountry').click(function() {
        let name = $('#add #name').val()
        $.ajax({
          method: 'get',
          url: 'exchange/' + name,
          success: function(data) {
              if (data) {
                let c = window.confirm('This country already exists. ' +
                  'Do you want to update it?')
                if (c) {
                  updateCountry('#add', name)
                } 
                $('#add input').val('')
              } else {
                $.ajax({
                  method: 'put',
                  data: JSON.stringify({
                      name:       name,
                      currency:   $('#add #currency').val(),
                      rate:       Number($('#add #rate').val()),
                      commission: Number($('#add #commission').val()),
                      notation:   $('#add #notation').val()
                  }),
                  contentType: 'application/json',
                  url: 'exchange/' + name,
                  success: function(data) {
                    alert('Successfully submitted country.')
                    $('#add input').val('')
                  }
                })
              }
          }
        })

    })
    
    $('#updatecountry').click(function() {
        let name = $('#update #name option:selected').text()
        updateCountry('#update ', name)
    })
    
    $('#clearsubmissionform').click(function() {
        $('#add input').val('')
    })
    
    $('#clearupdateform').click(function() {
        $('#update input').val('')
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