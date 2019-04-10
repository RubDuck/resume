"use strict";

!function () {
  var model = {
    data: { name: '', words: '' },
    //获取数据
    init() {
      var APP_ID = 'cNmI5zJxkods8GT3YBh6efP4-gzGzoHsz';
      var APP_KEY = 'mA7yocdIUunS2MjJCBq5NNv8';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    //保存数据
    save(name, words) {
      var TestObject = AV.Object.extend('Massages');
      var testObject = new TestObject();
      var test = testObject.save({
        'words': words,
        'name': name
      });
      return test;
    },
    //更新数据
    updata() {
      var query = new AV.Query('Massages');
      return query.find().then(res => {
        this.data = res.map(re => {
          return { ...re.attributes }
        }
        )
      })
    }
  };

  
  let view = {
    el: '.Massages',
    render(data) {
      let messageList = data.map(res => {
        let $li = $("<li></li>").text(res.name + ' : ' + res.words)
        return $li
      })
      messageList.map((list) => {
        $(this.el).find('.text').append(list)
      })
    }
  }


  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.model.init()
      this.Getmassage()
      this.bindEvent()
    },
    bindEvent() {
      $('#postMassages').on('submit', e => {
        e.preventDefault()
        let name = $('#postMassages').find("input[name='name']").val()
        let words = $('#postMassages').find("input[name='message']").val()
        this.model.save(name, words).then(res => {
          console.log(this.model.data)
          let date = [{ 'name': `${name}`, 'words': `${words}` }]
          this.view.render(date)
          $('#postMassages').find("input[name='name']").val('')
          $('#postMassages').find("input[name='message']").val('')
        })
      })
    },
    Getmassage() {
      this.model.updata().then(res => {
        this.view.render(this.model.data)
      })
    }

  }


  controller.init(view, model);
}.call();