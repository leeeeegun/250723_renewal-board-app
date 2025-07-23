package com.codingrecipe.backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@ToString
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
}
