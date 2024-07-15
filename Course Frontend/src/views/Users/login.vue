<script setup>

</script>

<template>
<div class="center-container" >
    <div class="container-fluid font_serie ">
            <div class="base_login mx-auto">
                <div class="container-fluid rounded">
                    <div class="row">
                        <div class="col-12 col-xl-12">
                            <h2 class="text-center mt-4 mb-4">Iniciar Sesion</h2>
                            <form  class="mb-2">
                                <div class="form-floating mb-3">
                                        <input type="email"  class="form-control data_control"  placeholder="name@example.com">
                                        <label for="floatingInput">Usuario:</label>
                                </div>
                                <div class="form-floating mb-3">
                                        <input type="password"  class="form-control  data_control" placeholder="Password">
                                        <label for="floatingPassword">Contraseña</label>
                                </div>
                                <div class="d-grid gap-2 mb-2">
                                    <router-link>
                                        <p class="text-center">No tienes Usuario, puedes registarte aqui!</p>
                                    </router-link>
                                </div>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-success">
                                        Iniciar Sesion
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
    </div>
</div>
</template>
<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.logo_resolution{
    width: 100px;
    height: 100px;

}


.base_session{
    border: 0px solid black;
    background: rgb(255, 255, 255);
    border-radius: 15px;
    padding: 15px;
}
.base_login{
    border: 0.1mm solid rgb(154, 149, 149);
    border-radius: 15px;
    background-color: #ffffff; /* Color de fondo */
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.605); 
    width: 380px;
    height: auto;
}
.data_control{
    border: 1px solid rgb(122, 117, 117);
}
</style>