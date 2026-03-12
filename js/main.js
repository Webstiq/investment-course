// --------------------------------------------------
// Countdown
// --------------------------------------------------

const months = [
    'stycznia','lutego','marca','kwietnia','maja','czerwca',
    'lipca','sierpnia','września','października','listopada','grudnia'
]

const nextMonthIndex = (new Date().getMonth() + 1) % 12
const nextMonthYear = new Date().getMonth() === 11
    ? new Date().getFullYear() + 1
    : new Date().getFullYear()

const handleStartMonth = () => {
    document.getElementById('start-month').textContent =
        '1 ' + months[nextMonthIndex] + ' ' + nextMonthYear
}

handleStartMonth()


// --------------------------------------------------
// Counter animation
// --------------------------------------------------

const animateCounter = el => {
    const target = parseInt(el.dataset.count)
    const suffix = el.dataset.suffix || ''

    if (!target) {
        el.textContent = el.textContent
        return
    }

    let current = 0
    const step = target / 60

    const timer = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = Math.round(current).toLocaleString('pl') + suffix

        if (current >= target) clearInterval(timer)
    }, 16)
}

const counters = document.querySelectorAll('[data-count]')

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounter(e.target)
            counterObserver.unobserve(e.target)
        }
    })
}, { threshold: 0.5 })

counters.forEach(c => counterObserver.observe(c))


// --------------------------------------------------
// Reveal on scroll
// --------------------------------------------------

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible')
        }
    })
}, { threshold: 0.1 })

document
    .querySelectorAll('.reveal')
    .forEach(el => revealObserver.observe(el))


// --------------------------------------------------
// FAQ toggle
// --------------------------------------------------

const toggleFaq = btn => {
    const item = btn.closest('.faq-item')
    const isOpen = item.classList.contains('open')

    document
        .querySelectorAll('.faq-item')
        .forEach(i => i.classList.remove('open'))

    if (!isOpen) item.classList.add('open')
}


// --------------------------------------------------
// Week tabs
// --------------------------------------------------
const weeks = document.querySelectorAll('.week')
const handleWeekTabs = () => {
    weeks.forEach(week => {
        week.addEventListener('click', () => {

            weeks.forEach(w => w.classList.remove('active'))

            week.classList.add('active')
        })
    })
}

handleWeekTabs()

// --------------------------------------------------
// Animate chart bars on scroll
// --------------------------------------------------

const chartObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {

            e.target.querySelectorAll('.chart-bar').forEach((bar, i) => {
                const targetWidth = bar.dataset.width

                setTimeout(() => {
                    bar.style.width = targetWidth
                }, i * 150)
            })

            chartObserver.unobserve(e.target)
        }
    })
}, { threshold: 0.4 })

const cvChart = document.querySelector('.cv-chart')

const handleChartObserver = () => {
    if (cvChart) chartObserver.observe(cvChart)
}

handleChartObserver()


// --------------------------------------------------
// Current year
// --------------------------------------------------

const handleCurrentYear = () => {
    document.getElementById('year').textContent = new Date().getFullYear()
}

handleCurrentYear()