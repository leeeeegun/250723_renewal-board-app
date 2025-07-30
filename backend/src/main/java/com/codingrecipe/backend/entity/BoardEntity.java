package com.codingrecipe.backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@Entity
@ToString(exclude = "fileList")
@NoArgsConstructor
@Table(name = "board_table")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String boardTitle;
    private String boardWriter;
    private String boardPass;

    @Column(columnDefinition = "TEXT")
    private String boardContent;

    private int boardHits;
    private int fileAttached;

    private LocalDateTime created = LocalDateTime.now();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<FileEntity> fileList = new ArrayList<>();

}
