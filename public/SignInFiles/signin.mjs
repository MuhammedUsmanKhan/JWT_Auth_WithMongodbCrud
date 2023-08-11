


let changeImg = (imgSrc) =>{

const imgTag = document.getElementsByTagName('image')

imgTag.src = imgSrc

}

let showPass = document.getElementById(`showPass`)
let signupPass = document.getElementById(`userPassword`)
let hidePass = document.getElementById(`hidePass`)
showPass.addEventListener(`click`, () => {
    signupPass.type = 'text'
    showPass.classList.add('hidden')
    hidePass.classList.remove('hidden')
    hidePass.classList.add('flex')
})
hidePass.addEventListener(`click`, () => {
    signupPass.type = 'password'
    hidePass.classList.add('hidden')
    showPass.classList.remove('hidden')
})
let darkMode = document.getElementById(`darkMode`)
let lightMode = document.getElementById(`lightMode`)
let body = document.querySelector(`body`)
let signupHead = document.querySelector(`header`)
let main = document.querySelector('main')
let inps = document.querySelectorAll('input')
let labels = document.querySelectorAll('label')
let footer = document.querySelector('footer')
darkMode.addEventListener(`click`, () => {

    if (!body.classList.contains('bg-white')) {
        lightMode.disabled = false
        darkMode.disabled = true
        body.classList.toggle('bg-[#070724]')
        signupHead.classList.toggle('text-blue-600')
        signupHead.classList.toggle('text-white')
        main.classList.toggle('text-blue-600')
        main.classList.toggle('text-white')
        inps.forEach((input) => {
            input.classList.toggle('bg-[#070724]')
        })
        labels.forEach((label) => {
                label.classList.toggle('bg-[#070724]')
                label.classList.toggle('bg-white')
        })
        footer.classList.toggle('text-blue-600')
        footer.classList.toggle('text-white')
    }


})
lightMode.addEventListener(`click`, () => {
    if (body.classList.contains('bg-[#070724]')) {
        lightMode.disabled = true
        darkMode.disabled = false
        body.classList.toggle('bg-[#070724]')
        signupHead.classList.toggle('text-blue-600')
        signupHead.classList.toggle('text-white')
        main.classList.toggle('text-blue-600')
        main.classList.toggle('text-white')
        inps.forEach((input) => {
            input.classList.toggle('bg-[#070724]')
        })
        labels.forEach((label) => {
                label.classList.toggle('bg-[#070724]')
                label.classList.toggle('bg-white')
        })
        footer.classList.toggle('text-blue-600')
        footer.classList.toggle('text-white')
    }
})
const userEmail = document.getElementById('userEmail')
const userPassword = document.getElementById('userPassword')
const submitForm = document.getElementById('submitForm')
let VerifyUser = (event) => {
    event.preventDefault()
    // try {
    axios.post('/JWT-Auth/signin', {
        email: userEmail.value,
        password: userPassword.value
    })
        .then((response) => {
            console.log(response)
            userEmail.value = ""
            userPassword.value = ""
            // location.href = './SignInFiles/signin.html'
        })
        .catch((err) => {
            console.log(err)
        })
}
submitForm.addEventListener('submit', VerifyUser)