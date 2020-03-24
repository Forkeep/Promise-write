class Promise2 {
    state = 'pending'
    succeed = null
    fail = null
    resolve(result) {
        setTimeout(() => {
            this.state = 'fulfilled'
            this.succeed(result)
        })
    }

    reject(err) {
        setTimeout(() => {
            this.state = 'rejected'
            this.fail(err)
        })
    }

    constructor(fn) {
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    then(succeed, fail) {
        this.succeed = succeed
        this.fail = fail
    }

}

const getweather = city => new Promise2((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    let url = 'http://rap2api.taobao.org/app/mock/244238/weather?city=' + city
    xhr.open('GET', url, true)
    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
        }else{
            reject(`获取${city}天气失败`)
        }
    }
    xhr.send()
})


getweather('平顶山')
.then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})