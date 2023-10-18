<script>
    import { Label, Fileupload } from 'flowbite-svelte';
    import { authenticatedPostRequest } from '../lib/authenticated';

    let fileuploadprops = {
        accept: "image/*",
        name: "mussepicture",
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const json = await authenticatedPostRequest("http://localhost:42069/upload_mussepicture", data, "", "form");
    }

</script>

<form method="POST" action="localhost:42069/upload_mussepicture" on:submit={handleSubmit}>
    
    <Label class="pb-2">Last opp mussebilde</Label>
    <Fileupload {...fileuploadprops} />

    <button type="submit" class="centered text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >Last opp</button>

</form>