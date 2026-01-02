import { Fade } from "react-awesome-reveal";
import { FiShield, FiLock, FiEye, FiDatabase } from "react-icons/fi";

const Privacy = () => {
    const sections = [
        {
            icon: FiShield,
            title: "Information We Collect",
            content: [
                "Personal information (name, email, profile photo) when you create an account",
                "Artwork information and images you upload to our platform",
                "Usage data and analytics to improve our services",
                "Communication preferences and interaction history",
            ],
        },
        {
            icon: FiLock,
            title: "How We Use Your Information",
            content: [
                "To provide and maintain our services",
                "To notify you about changes to our services",
                "To provide customer support",
                "To gather analysis or valuable information to improve our services",
                "To detect, prevent and address technical issues",
            ],
        },
        {
            icon: FiEye,
            title: "Information Sharing",
            content: [
                "We do not sell your personal information to third parties",
                "Your public artworks and profile are visible to other users",
                "We may share data with service providers who assist our operations",
                "We may disclose information if required by law",
            ],
        },
        {
            icon: FiDatabase,
            title: "Data Security",
            content: [
                "We use industry-standard encryption to protect your data",
                "Regular security audits and updates",
                "Secure authentication through Firebase",
                "Limited access to personal information by our team",
            ],
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
                                Privacy <span className="text-primary">Policy</span>
                            </h1>
                            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
                                Your privacy is important to us. This policy explains how we collect,
                                use, and protect your personal information.
                            </p>
                            <p className="text-sm text-base-content/60 mt-4">
                                Last updated: January 2, 2026
                            </p>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <Fade key={section.title} delay={index * 100}>
                                <div className="card bg-base-200 shadow-xl">
                                    <div className="card-body">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                                <section.icon className="text-2xl text-primary" />
                                            </div>
                                            <h2 className="card-title text-2xl text-base-content">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <ul className="space-y-3">
                                            {section.content.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="text-primary mt-1">•</span>
                                                    <span className="text-base-content/70">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Sections */}
            <section className="py-16 bg-base-200">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-8">
                        <Fade>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-base-content mb-4">
                                        Your Rights
                                    </h2>
                                    <div className="text-base-content/70 space-y-3">
                                        <p>You have the right to:</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Access your personal data</li>
                                            <li>Correct inaccurate data</li>
                                            <li>Request deletion of your data</li>
                                            <li>Object to data processing</li>
                                            <li>Data portability</li>
                                            <li>Withdraw consent at any time</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                        <Fade delay={200}>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-base-content mb-4">
                                        Cookies and Tracking
                                    </h2>
                                    <div className="text-base-content/70 space-y-3">
                                        <p>
                                            We use cookies and similar tracking technologies to track activity
                                            on our service and hold certain information. You can instruct your
                                            browser to refuse all cookies or to indicate when a cookie is being sent.
                                        </p>
                                        <p>
                                            We use both session and persistent cookies for the following purposes:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Essential cookies for authentication and security</li>
                                            <li>Preference cookies to remember your settings</li>
                                            <li>Analytics cookies to understand how you use our service</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                        <Fade delay={400}>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-base-content mb-4">
                                        Children's Privacy
                                    </h2>
                                    <div className="text-base-content/70 space-y-3">
                                        <p>
                                            Our service is not intended for children under 13 years of age.
                                            We do not knowingly collect personal information from children under 13.
                                            If you are a parent or guardian and you are aware that your child has
                                            provided us with personal data, please contact us.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                        <Fade delay={600}>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-base-content mb-4">
                                        Changes to This Policy
                                    </h2>
                                    <div className="text-base-content/70 space-y-3">
                                        <p>
                                            We may update our Privacy Policy from time to time. We will notify you
                                            of any changes by posting the new Privacy Policy on this page and updating
                                            the "Last updated" date at the top of this policy.
                                        </p>
                                        <p>
                                            You are advised to review this Privacy Policy periodically for any changes.
                                            Changes to this Privacy Policy are effective when they are posted on this page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                        <Fade delay={800}>
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl text-base-content mb-4">
                                        Contact Us
                                    </h2>
                                    <div className="text-base-content/70 space-y-3">
                                        <p>
                                            If you have any questions about this Privacy Policy, please contact us:
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <span className="font-semibold">Email:</span>
                                                <a href="mailto:privacy@artisansecho.com" className="text-primary hover:underline">
                                                    privacy@artisansecho.com
                                                </a>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="font-semibold">Phone:</span>
                                                <a href="tel:+15551234567" className="text-primary hover:underline">
                                                    +1 (555) 123-4567
                                                </a>
                                            </li>
                                            <li>
                                                <span className="font-semibold">Address:</span>
                                                <span className="ml-2">123 Art Street, Creative City, CA 90210</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Fade>
                        <h2 className="text-3xl font-bold text-base-content mb-6">
                            Questions About Your Privacy?
                        </h2>
                        <p className="text-xl text-base-content/70 mb-8">
                            We're here to help. Contact our privacy team for any concerns.
                        </p>
                        <a href="/contact" className="btn btn-primary btn-lg">
                            Contact Us
                        </a>
                    </Fade>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
