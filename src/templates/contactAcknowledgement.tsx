import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactAcknowledgementProps {
  name: string;
}

export default function ContactAcknowledgement({
  name,
}: ContactAcknowledgementProps) {
  return (
    <Html>
      <Head />
      <Preview>We have received your enquiry</Preview>

      <Body
        style={{
          backgroundColor: "#f5f7fa",
          fontFamily: "Arial, sans-serif",
          padding: "30px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "30px",
          }}
        >
          <Heading
            style={{
              color: "#0f172a",
              fontSize: "26px",
              marginBottom: "20px",
            }}
          >
            Thank You for Contacting Us!
          </Heading>

          <Text>
            Dear <strong>{name}</strong>,
          </Text>

          <Text>
            Thank you for contacting <strong>TITO</strong>.
            We have successfully received your enquiry.
          </Text>

          <Text>
            Our team is reviewing your request and will get back to you as
            soon as possible.
          </Text>

         

          <Text>
            We appreciate your interest in our services and look forward to
            connecting with you.
          </Text>

          <Section
            style={{
              marginTop: "30px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              TITO
            </Text>

            <Text
              style={{
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Technology Partner for Your Business
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}