<script>
    import {link} from 'svelte-spa-router'
</script>

<a href="/" use:link>
    <span>JO</span>YEONG<span>MIN</span>
</a>

<style lang="scss">
    a {
        display: block;
        font-size: 30px;
        color : $color--white-50;
        text-decoration: none;
        font-family: 'Oswald', sans-serif;
        span {
            color : $color--primary;
            
        }
    }
</style>