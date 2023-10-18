<script>
    import { Card } from 'flowbite-svelte';
    import UserApproved from '../../components/UserApproved.svelte';
    import MussePictureUploadForm from "../../components/MussePictureUploadForm.svelte";
</script>

<h1>Innstillinger</h1>

<Card class="mb-4">
    <UserApproved />
</Card>

<Card class="mb-4">
    <h2>Mussebilde</h2>
    <MussePictureUploadForm />
</Card>
