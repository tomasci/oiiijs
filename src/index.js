class Oiii {
    #viewer = {
        area: null,
        container: null,
        button: null
    }

    #store = {
        type: true,
        current: null,
        full: null
    }

    #list_definitions = ['data-oi-list', 'data-oi-list-yt']
    #single_definitions = ['data-oi-image', 'data-oi-video']

    constructor() {
        this.make_viewer()
        this.make_lists()
        this.make_single()
    }

    make_viewer() {
        let viewer = document.createElement('div')
        let container = document.createElement('div')
        let button = document.createElement('a')

        viewer.classList.add('viewer')
        container.classList.add('container')

        viewer.addEventListener('click', (e => {
            let el = e.target
            if (el.tagName === 'A') {
                return
            }

            this.update(false)
        }))

        button.innerText = ''
        button.href = '#'
        button.target = '_blank'

        viewer.appendChild(container)
        viewer.appendChild(button)

        this.#viewer = {
            area: viewer,
            container: container,
            button: button
        }

        document.body.appendChild(this.#viewer.area)
    }

    make_lists() {
        let lists = []
        this.#list_definitions.forEach(def => {
            lists = lists.concat(
                Array.from(
                    document.querySelectorAll(
                        ['[', def, ']'].join('')
                    )
                )
            )
        })

        lists.forEach(list => {
            if (list.hasAttribute(this.#list_definitions[0])) {
                // images
                this.handle(list.querySelectorAll('img'))
            } else if (list.hasAttribute(this.#list_definitions[1])) {
                // yt
                this.handle(list.querySelectorAll('a'))
            }
        })
    }

    make_single() {
        let singles = []
        this.#single_definitions.forEach(def => {
            singles = singles.concat(
                Array.from(
                    document.querySelectorAll(
                        ['[', def, ']'].join('')
                    )
                )
            )
        })
        this.handle(singles)
    }

    handle(elements) {
        elements.forEach(element => {
            element.addEventListener('click', (e => {
                e.preventDefault()

                this.#store = {
                    current: (element.hasAttribute('data-oi-preview')) ? element.dataset.oiPreview : element.dataset.oiYt,
                    full: (element.hasAttribute('data-oi-fullsize')) ? element.dataset.oiFullsize : null,
                    type: (element.hasAttribute('data-oi-preview') || element.hasAttribute('data-oi-fullsize'))
                }

                this.update(true)
            }))
        })
    }

    update(state) {
        if (state === true && this.#store.current !== null) {
            if (this.#store.type === true) {
                let img = document.createElement('img')
                img.src = this.#store.current

                this.#viewer.container.appendChild(img)
                this.#viewer.button.href = this.#store.full
            } else if (this.#store.type === false) {
                let url = 'https://www.youtube.com/embed/' + this.parse_url(this.#store.current).toString()

                let frame = document.createElement('iframe')
                frame.src = url
                frame.frameBorder = '0'
                frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                frame.allowFullscreen = true

                this.#viewer.container.appendChild(frame)
                this.#viewer.button.href = this.#store.current
            }

            this.#viewer.button.innerText = ['Open', (this.#store.type) ? 'image' : 'in YouTube'].join(' ')
            this.#viewer.area.classList.toggle('viewer_show')
        }

        if (state === false) {
            this.#viewer.area.classList.toggle('viewer_show')
            setTimeout(() => {
                this.#viewer.container.innerHTML = ""
                this.#viewer.button.href = '#'
            }, 250)
        }
    }

    parse_url(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        let match = url.match(regExp)
        return (match && match[7].length===11) ? match[7] : false
    }
}

module.exports = Oiii