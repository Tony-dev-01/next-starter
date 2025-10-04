export default async function Checkout({ searchParams }) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you’re ready."
    );
  }
  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link" className="btn btn-accent">
          Checkout
        </button>
      </section>
    </form>
  );
}
