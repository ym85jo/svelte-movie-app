<footer>
    <div>
        <a href="https://github.com/ym85jo/svelte-movie-app" target="_black">GitHub Repo.</a>
    </div>
    <div>
        <a href="https://joym-svelte.netlify.app/" target="_black">
            @{new Date().getFullYear()}
            Jo Yeong Min
        </a>
    </div>
</footer>

<style lang="scss">
    footer {
        padding : 70px;
        text-align: center;
        a {
            color : $color--white-10;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>