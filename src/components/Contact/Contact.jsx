import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi";
import Swal from "sweetalert2";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            Swal.fire({
                title: "Message Sent!",
                text: "Thank you for contacting us. We'll get back to you soon!",
                icon: "success",
                confirmButtonColor: "#8b5cf6",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
            setLoading(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: FiMail,
            title: "Email",
            value: "hello@artisansecho.com",
            link: "mailto:hello@artisansecho.com",
        },
        {
            icon: FiPhone,
            title: "Phone",
            value: "+1 (555) 123-4567",
            link: "tel:+15551234567",
        },
        {
            icon: FiMapPin,
            title: "Address",
            value: "123 Art Street, Creative City, CA 90210",
            link: "https://maps.google.com",
        },
        {
            icon: FiClock,
            title: "Business Hours",
            value: "Mon - Fri: 9AM - 6PM PST",
            link: null,
        },
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Fade>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6">
                                Get in <span className="text-primary">Touch</span>
                            </h1>
                            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
                                Have a question, feedback, or just want to say hello?
                                We'd love to hear from you!
                            </p>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <Fade key={info.title} delay={index * 100}>
                                <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <div className="card-body items-center text-center">
                                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                            <info.icon className="text-3xl text-primary" />
                                        </div>
                                        <h3 className="card-title text-base-content text-lg">{info.title}</h3>
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-base-content/70 hover:text-primary transition-colors"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p className="text-base-content/70">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 bg-base-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <Fade>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-base-content mb-6">
                                        Send Us a Message
                                    </h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Your Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Email Address</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Subject</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help?"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Message</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us more..."
                                                className="textarea textarea-bordered h-32"
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary w-full"
                                        >
                                            {loading ? (
                                                <span className="loading loading-spinner"></span>
                                            ) : (
                                                <>
                                                    <FiSend className="mr-2" /> Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Fade>

                        {/* Map & Additional Info */}
                        <Fade delay={200}>
                            <div className="space-y-6">
                                {/* Map */}
                                <div className="card bg-base-100 shadow-xl overflow-hidden">
                                    <div className="h-64 lg:h-80">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841374555!2d-73.98823492346576!3d40.75889697138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Office Location"
                                        ></iframe>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h3 className="card-title text-base-content mb-4">
                                            Frequently Asked Questions
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="collapse collapse-arrow bg-base-200">
                                                <input type="radio" name="faq-accordion" defaultChecked />
                                                <div className="collapse-title font-medium">
                                                    How long does it take to get a response?
                                                </div>
                                                <div className="collapse-content">
                                                    <p className="text-base-content/70">
                                                        We typically respond within 24-48 hours during business days.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-base-200">
                                                <input type="radio" name="faq-accordion" />
                                                <div className="collapse-title font-medium">
                                                    Can I visit your office?
                                                </div>
                                                <div className="collapse-content">
                                                    <p className="text-base-content/70">
                                                        Yes! Please schedule an appointment in advance.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="collapse collapse-arrow bg-base-200">
                                                <input type="radio" name="faq-accordion" />
                                                <div className="collapse-title font-medium">
                                                    Do you offer phone support?
                                                </div>
                                                <div className="collapse-content">
                                                    <p className="text-base-content/70">
                                                        Yes, our phone lines are open Monday-Friday, 9AM-6PM PST.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Fade>
                        <h2 className="text-3xl font-bold text-base-content mb-6">
                            Connect With Us
                        </h2>
                        <p className="text-base-content/70 mb-8">
                            Follow us on social media for the latest updates, featured artists, and more!
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-lg btn-outline btn-primary hover:btn-primary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-lg btn-outline btn-primary hover:btn-primary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-circle btn-lg btn-outline btn-primary hover:btn-primary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                </svg>
                            </a>
                        </div>
                    </Fade>
                </div>
            </section>
        </div>
    );
};

export default Contact;
