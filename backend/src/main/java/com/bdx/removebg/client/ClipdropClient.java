package com.bdx.removebg.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

// Clip Drop Client
@FeignClient(name = "clipdropClient", url = "https://clipdrop-api.co")
public interface ClipdropClient {

    @PostMapping(value = "/remove-background/v1", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    byte[] removeBackground(@RequestPart("image_file") MultipartFile imageFile,
        @RequestHeader("x-api-key") String apiKey);
}