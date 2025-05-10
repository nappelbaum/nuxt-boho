<script setup>

const copyright = new Date().getFullYear();

</script>

<template>
    <footer>
        <div class="main-container">
            <div class="footer">
                <div class="flex gap-x-5 items-center">
                    <a href="https://instagram.com">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="25px" height="25px" viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve">
                        <path fill="currentColor" d="M23,8.562h-6.393c-1.045-1.069-2.502-1.75-4.107-1.75c-1.604,0-3.062,0.681-4.108,1.75H2v-3.5
                            C2,3.384,3.385,2,5.062,2h14.875C21.615,2,23,3.384,23,5.062V8.562z M23,10.312v9.625C23,21.615,21.615,23,19.938,23H5.062
                            C3.385,23,2,21.615,2,19.938v-9.625h5.25c-0.291,0.681-0.438,1.41-0.438,2.188c0,3.135,2.553,5.688,5.688,5.688
                            c3.136,0,5.687-2.553,5.687-5.688c0-0.777-0.145-1.507-0.438-2.188H23z M8.562,12.5c0-2.163,1.751-3.938,3.938-3.938
                            c2.164,0,3.937,1.774,3.937,3.938c0,2.188-1.773,3.938-3.937,3.938C10.313,16.438,8.562,14.688,8.562,12.5z"/>
                        </svg>
                    </a>

                    <a href="https://etsy.com" class="copyright__etsy-img">
                        <img src="../public/img/etsy.png" alt="">
                    </a>
                </div>

                <div class="copyright">
                    <p class="copyright__left">
                        Privacy Policy
                    </p>
                    <p class="copyright__right">
                        Copyright &copy;
                        {{ copyright }}
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables.scss" as var;
@use "~/assets/scss/base.scss";

footer {
    padding: 36px 0;
    background-color: var.$footer-back-color;
    margin-top: auto;

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var.$link-color;

        @media (max-width: 600px) {
            flex-direction: column;
            justify-content: center;
            row-gap: 16px;
        }

        .copyright__etsy-img {
            width: 25px;
            padding: 1.4px;
            opacity: 0.35;
        }

        .copyright {
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;

            .copyright__left {
                padding-right: 1rem;
                border-right: 1px solid var.$link-color;
            }
            .copyright__right {
                padding-left: 1rem;
            }
        }
    }
}

</style>