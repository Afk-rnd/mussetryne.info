<script>
    import { ImagePlaceholder } from 'flowbite-svelte';
    import { Label, Fileupload } from 'flowbite-svelte';
    import { authenticatedPostRequest } from '../lib/authenticated';


    let fileuploadprops = {
        accept: "image/*",
        name: "mussepicture",
        id: "mussepicture",
    };

    
    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const json = await authenticatedPostRequest("http://localhost:42069/upload_mussepicture", data, "", "form");
    }

    let image = null;
    
    function handle_file_upload(event) {
        const file = event.target.files[0];
        if(file) {
            image = URL.createObjectURL(file);
        }
    }


</script>

<form method="POST" action="localhost:42069/upload_mussepicture" on:submit={handleSubmit}>
    
    <Label class="pb-2">Last opp mussebilde</Label>
    <Fileupload {...fileuploadprops} on:change={handle_file_upload}/>

    {#if image}
        <img class="mt-8 mb-4" src={image} alt="Ditt mussebilde."/>
    {:else}
        <ImagePlaceholder imgHeight={60} class="mt-8"/>
    {/if}

    <button type="submit" class="centered text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >Last opp</button>

</form>