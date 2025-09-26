package com.bdx.removebg.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

//clerkJwtAuth Filter component 
@Component
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    private final String clerkIssuer;
    private final ClerkJwksProvider jwksProvider;

    public ClerkJwtAuthFilter(@Value("${clerk.issuer}") String clerkIssuer, ClerkJwksProvider jwksProvider) {
        this.clerkIssuer = clerkIssuer;
        this.jwksProvider = jwksProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("Api is hitiing the ClerkJwtAuthFilter");

        if (request.getRequestURI().contains("/api/webhooks")) 
        {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer")) 
        {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Authorization header is missing.");
            return;
        }

        try {
    
            String token = authHeader.substring(7);
            String[] chunks = token.split("\\.");
            String headerJson = new String(Base64.getUrlDecoder().decode(chunks[0]));

            ObjectMapper mapper = new ObjectMapper();
            JsonNode headerNode = mapper.readTree(headerJson);
            String kid = headerNode.get("kid").asText();

            PublicKey publicKey = jwksProvider.getPublicKey(kid);

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(publicKey)
                    .setAllowedClockSkewSeconds(60) 
                    .requireIssuer(clerkIssuer)       
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String clerkUserId = claims.getSubject();

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    clerkUserId,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            
            filterChain.doFilter(request, response);
            System.out.println("completed");
        } 
        catch (Exception e) 
        {
            System.out.println("Error in ClerkJwtAuth Filter");
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid JWT token");
        }
    }
}
